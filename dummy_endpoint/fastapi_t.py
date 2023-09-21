from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import base64
import time

app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


@app.post("/get_image_as_base64/")
async def get_image_as_base64():
    try:
        time.sleep(2)
        image_path = "image.png"

        with open(image_path, "rb") as image_file:
            image_data = image_file.read()
        base64_encoded = base64.b64encode(image_data).decode()

        return {"image": base64_encoded}
    except FileNotFoundError:
        return {"error": "Image not found"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
