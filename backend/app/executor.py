import os
from dotenv import load_dotenv
from google import genai
from google.genai import errors

load_dotenv()

def execute_model(decision, messages):
    """
    Executes the request against the chosen model.
    """
    if "gemini" in decision.model.lower():
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            return "Error: GEMINI_API_KEY is not set or empty."
            
        try:
            client = genai.Client(api_key=api_key)
            
            formatted_contents = []
            for m in messages:
                role = "user" if m.get("role") == "user" else "model"
                formatted_contents.append({
                    "role": role,
                    "parts": [{"text": str(m.get("content", ""))}]
                })
            
            response = client.models.generate_content(
                model='gemini-3.8-flash',
                contents=formatted_contents,
            )
            return response.text
        except errors.ClientError as e:
            return f"Error: Failed to execute Gemini model due to an API error: {str(e)}"
        except Exception as e:
            return f"Error: Failed to execute Gemini model due to an unexpected error: {str(e)}"
    elif "qwen" in decision.model.lower():
        try:
            import urllib.request
            import urllib.error
            import json
            import socket

            url = "http://127.0.0.1:11434/api/chat"
            formatted_messages = []
            for m in messages:
                role = "user" if m.get("role") == "user" else "assistant"
                formatted_messages.append({
                    "role": role,
                    "content": str(m.get("content", ""))
                })

            payload = {
                "model": "qwen2.5:3b",
                "messages": formatted_messages,
                "stream": False
            }

            req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers={'Content-Type': 'application/json'})
            with urllib.request.urlopen(req, timeout=120) as response:
                result = json.loads(response.read().decode('utf-8'))
                return result.get("message", {}).get("content", "")
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return f"Error: Model {decision.model} not found in local Ollama."
            return f"Error: Ollama API returned HTTP error: {e.code} {e.reason}"
        except urllib.error.URLError as e:
            if isinstance(e.reason, socket.timeout):
                return "Error: Request to local Ollama timed out."
            return f"Error: Failed to connect to local Ollama instance: {str(e)}"
        except Exception as e:
            return f"Error: Failed to execute Qwen model due to an unexpected error: {str(e)}"
    else:
        return f"Error: Model {decision.model} is not currently implemented for execution."
