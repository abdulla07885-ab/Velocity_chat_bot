# Velocity Backend

This is the FastAPI backend for the Velocity LLM routing project.

## Local Setup

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Copy the `.env.example` to `.env` and fill in any required keys:
   ```bash
   cp .env.example .env
   ```

4. Run the server:
   ```bash
   uvicorn app.main:app --reload
   ```

The API will be available at http://localhost:8000.
You can view the interactive API documentation at http://localhost:8000/docs.
