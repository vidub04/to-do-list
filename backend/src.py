from fastapi import FastAPI
from connection import supabase
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

class Task(BaseModel):
    name: str

app=FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://to-do-list-six-dun-73.vercel.app/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




@app.get("/")
def home_page():
    response=supabase.table("tasks").select("*").execute()
    arr=[]
    for x in response.data:
        arr.append(x)
    return arr

@app.get("/showtasks")
def get_tasks():

    response=supabase.table("tasks").select("*").eq("status","In Progress").execute()
    arr=[]
    for x in response.data:
        arr.append(x)
    return arr



@app.get("/showdone")
def get_tasks():

    response=supabase.table("tasks").select("*").eq("status","Done").execute()
    arr=[]
    for x in response.data:
        arr.append(x)
    return arr

@app.post("/insert")
def insert_tasks(task:Task):
    response=supabase.table("tasks").insert({"name":task.name,"status":"In Progress"}).execute()

    return "done"

@app.put("/mark/{tid}")
def mark_done(tid:int):

    response=supabase.table("tasks").update({"status":"Done"}).eq("task_id",tid).execute()
    

@app.delete("/delete/{tid}")
def deletion(tid:int):

    response=supabase.table("tasks").delete().eq("task_id",tid).execute()
    


