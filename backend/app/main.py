from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base
import app.models  # noqa: F401 – ensure all models are registered
from app.routers import configs, imports, metrics, tickets, llm


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(title="Flow Analyzer API", version="0.1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(configs.router)
app.include_router(imports.router)
app.include_router(metrics.router)
app.include_router(tickets.router)
app.include_router(llm.router)


@app.get("/health")
def health():
    return {"status": "ok"}
