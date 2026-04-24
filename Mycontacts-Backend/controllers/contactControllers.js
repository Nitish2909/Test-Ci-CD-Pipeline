const asyncHandler = require("express-async-handler");
const contactModel = require("../models/contactSchema")
//@desc Get All contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
  const contact = await contactModel.find()
  return res.status(200).json(contact);
});

//@desc Create contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are Mandatory!");
  }
  //create contact 
  const contact = await contactModel.create({
    name,
    email,
    phone
  })
  res.status(201).json(contact);
});

//@desc Get Individual contact
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
  
  // Find contact using id
  const contact = await contactModel.findById(req.params.id)
  if(!contact){
    res.send(404)
    throw new Error("Contact Not Found")
  }
  res.status(200).json(contact);
});

//@desc update contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {

  const contact = await contactModel.findById(req.params.id)
  if(!contact){
    res.send(404);
    throw new Error("Contact Not found")
  }
  const updatedContact = await contactModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
  );
  res.status(200).json(updateContact);
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await contactModel.findById(req.params.id)
  if(!contact){
    res.send(404);
    throw new Error("Contact Not found")
  }
  const deletedContact = await contactModel.findByIdAndDelete(
    req.params.id,
    req.body
  )
  res.status(200).json(deletedContact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
