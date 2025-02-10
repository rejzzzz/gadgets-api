list of all gadgets with success probability - GET(http://localhost:PORT/gadgets)

all the details of all the gadgets - GET(http://localhost:PORT/all)

to add a gadget - POST(http://localhost:PORT/gadgets)
with body: 
{
  "name":"name",
  "status" : "Available" || "Deployed" || "Destroyed" || "Decommissioned"
}

to modify/update details of a gadget - PATCH(http://localhost:PORT/gadgets/:id)

to delete/decommission a gadget - DELETE(http://localhost:PORT/gadgets/:id)

to self destruct any gadget - POST(http://localhost:PORT/gadgets/:id/self-destruct)
