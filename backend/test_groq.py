import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")
if not api_key or api_key == "gsk_placeholder":
    print("Please set GROQ_API_KEY in your .env file to run this test.")
else:
    client = Groq(api_key=api_key)
    try:
        print("Sending request to Groq llama-3.3-70b-versatile model...")
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": "Say hello in one sentence."}],
            temperature=0.4
        )
        print("Success! Groq response:")
        print(completion.choices[0].message.content)
    except Exception as e:
        print(f"Error calling Groq API: {e}")
