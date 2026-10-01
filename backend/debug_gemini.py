import os
import traceback
from dotenv import load_dotenv
load_dotenv()
from google import genai
client = genai.Client()
try:
    print("Testing generate_content...")
    response = client.models.generate_content(model='gemini-3.5-flash-lite', contents='Say hello world')
    print("Success:", response.text)
except Exception as e:
    print("Error occurred:")
    traceback.print_exc()
