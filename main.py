from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import uvicorn

app = FastAPI(title="Portfolio | Inżynieria & Sztuka")

# Serwowanie plików statycznych (CSS, JS, SVG/Obrazy)
app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")
templates.env.cache = None


@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse(request, "index.html", {"request": request})


if __name__ == "__main__":
    # Uruchomienie serwera lokalnego z automatycznym odświeżaniem po zapisie pliku w VS Code
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
