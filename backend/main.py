from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def testFunction():
    return {"Message" : "Test api"}