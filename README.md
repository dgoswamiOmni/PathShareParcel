# PathShareParcel
Google DevFest Submission


# PathShare Backend

Welcome to the backend codebase for PathShare, an innovative solution for eco-friendly freight transport. This backend is built using FastAPI and integrates with Google Cloud Firestore for efficient data storage.

## Getting Started

### Prerequisites

- Python 3.7 or higher
- [Google Cloud Firestore Credentials](https://cloud.google.com/firestore/docs/quickstart)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/pathshare-backend.git
   cd pathshare-backend


pip install -r requirements.txt

export GOOGLE_APPLICATION_CREDENTIALS=/path/to/your/credentials.json


uvicorn main:app --host 0.0.0.0 --port 8080 --reload

