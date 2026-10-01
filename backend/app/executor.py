import os
import re
from dotenv import load_dotenv
from google import genai
from google.genai import errors

load_dotenv()

def try_deterministic_math(text: str):
    """Fallback handler for simple math operations"""
    text = text.lower()
    # matches e.g. "what is 25 * 19?", "25 multiplied by 16"
    pattern = r"what is (\d+)\s*(?:\*|multiplied by)\s*(\d+)"
    match = re.search(pattern, text)
    if match:
        a, b = int(match.group(1)), int(match.group(2))
        return f"The answer is {a * b}."
    
    # addition
    pattern_add = r"what is (\d+)\s*(?:\+|plus)\s*(\d+)"
    match_add = re.search(pattern_add, text)
    if match_add:
        a, b = int(match_add.group(1)), int(match_add.group(2))
        return f"The answer is {a + b}."
        
    return None

def execute_model(decision, messages):
    """
    Executes the request against the chosen model.
    """
    print(f"EXECUTOR: attempting={decision.model}")
    text = " ".join([m.get("content", "") for m in messages])
    
    # Try lightweight deterministic math handler first
    math_result = try_deterministic_math(text)
    if math_result:
        return math_result

    # Block local ollama in production (Render)
    is_production = os.getenv("RENDER") is not None
    if is_production and ("qwen" in decision.model.lower() or "llama" in decision.model.lower()):
        print(f"EXECUTOR: unavailable={decision.model} (disabled in production)")
        return f"Error: Local model {decision.model} is disabled in production."

    if "gemini" in decision.model.lower():
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            print(f"EXECUTOR: unavailable={decision.model}")
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
            print(f"EXECUTOR: gemini_error_type={type(e).__name__}")
            print(f"EXECUTOR: gemini_error={str(e)}")
            print(f"EXECUTOR: unavailable={decision.model}")
            return f"Error: Failed to execute Gemini model due to an API error: {str(e)}"
        except Exception as e:
            print(f"EXECUTOR: gemini_error_type={type(e).__name__}")
            print(f"EXECUTOR: gemini_error={str(e)}")
            print(f"EXECUTOR: unavailable={decision.model}")
            return f"Error: Failed to execute Gemini model due to an unexpected error: {str(e)}"
    elif "qwen" in decision.model.lower() or "llama" in decision.model.lower():
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

            # Use decision.model name so it works for llama3.1:8b as well if requested
            payload = {
                "model": decision.model,
                "messages": formatted_messages,
                "stream": False
            }

            req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers={'Content-Type': 'application/json'})
            with urllib.request.urlopen(req, timeout=120) as response:
                result = json.loads(response.read().decode('utf-8'))
                return result.get("message", {}).get("content", "")
        except urllib.error.HTTPError as e:
            print(f"EXECUTOR: unavailable={decision.model}")
            if e.code == 404:
                return f"Error: Model {decision.model} not found in local Ollama."
            return f"Error: Ollama API returned HTTP error: {e.code} {e.reason}"
        except urllib.error.URLError as e:
            print(f"EXECUTOR: unavailable={decision.model}")
            if isinstance(e.reason, socket.timeout):
                return "Error: Request to local Ollama timed out."
            return f"Error: Failed to connect to local Ollama instance: {str(e)}"
        except Exception as e:
            print(f"EXECUTOR: unavailable={decision.model}")
            return f"Error: Failed to execute Qwen/Llama model due to an unexpected error: {str(e)}"
    else:
        print(f"EXECUTOR: unavailable={decision.model}")
        return f"Error: Model {decision.model} is not currently implemented for execution."
