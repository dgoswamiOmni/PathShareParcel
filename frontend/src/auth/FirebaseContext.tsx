import { createContext, useEffect, useReducer, useCallback, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signOut,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
// config
import { FIREBASE_API } from '../config-global';
//
import { ActionMapType, AuthStateType, AuthUserType, FirebaseContextType } from './types';

enum Types {
	INITIAL = "INITIAL",
}

type Payload = {
	[Types.INITIAL]: {
		isAuthenticated: boolean;
		user: AuthUserType;
	};
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  return state;
};

export const AuthContext = createContext<FirebaseContextType | null>(null);

const firebaseApp = initializeApp(FIREBASE_API);

const AUTH = getAuth(firebaseApp);

const DB = getFirestore(firebaseApp);

type AuthProviderProps = {
	children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
	const [state, dispatch] = useReducer(reducer, initialState);

	const initialize = useCallback(() => {
		try {
			onAuthStateChanged(AUTH, async (user) => {
				if (user) {
					const userRef = doc(DB, "users", user.uid);

					const docSnap = await getDoc(userRef);

					const profile = docSnap.data();

					dispatch({
						type: Types.INITIAL,
						payload: {
							isAuthenticated: true,
							user: {
								...user,
								...profile,
								role: "admin",
							},
						},
					});
				} else {
					dispatch({
						type: Types.INITIAL,
						payload: {
							isAuthenticated: false,
							user: null,
						},
					});
				}
			});
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		initialize();
	}, [initialize]);

	// LOGIN
	const login = useCallback((email: string, password: string) => {
		signInWithEmailAndPassword(AUTH, email, password);
	}, []);

	// REGISTER
	const register = useCallback(
		(email: string, password: string, firstName: string, lastName: string) => {
			createUserWithEmailAndPassword(AUTH, email, password).then(
				async (res) => {
					const userRef = doc(collection(DB, "users"), res.user?.uid);

					await setDoc(userRef, {
						uid: res.user?.uid,
						email,
						displayName: `${firstName} ${lastName}`,
					});
				},
			);
		},
		[],
	);

	// LOGOUT
	const logout = useCallback(() => {
		signOut(AUTH);
	}, []);

	const memoizedValue = useMemo(
		() => ({
			isInitialized: state.isInitialized,
			isAuthenticated: state.isAuthenticated,
			user: state.user,
			method: "firebase",
			login,
			register,
			logout,
		}),
		[
			state.isAuthenticated,
			state.isInitialized,
			state.user,
			login,
			register,
			logout,
		],
	);

	return (
		<AuthContext.Provider value={memoizedValue}>
			{children}
		</AuthContext.Provider>
	);
}
