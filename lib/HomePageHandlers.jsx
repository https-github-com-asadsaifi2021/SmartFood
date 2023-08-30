import { Database } from "../database/Database";

/* Handling Items and buttons */
// Handle item added to database
export const handleItemAdded = async (fetchData, setaddItemFormModal) => {
  setaddItemFormModal(false);
  await fetchData();
};

// Handle edit button
export const handleEdit = async (
  id,
  name,
  expiryDate,
  quantity,
  setEditData,
  setEditMode,
  setEditItemModal
) => {
  setEditMode(true);
  setEditData({
    id,
    name,
    expiryDate,
    quantity,
  });
  setEditItemModal(true);
};

// Hanlde item edited to database
export const handleItemEdited = async (
  fetchData,
  setEditMode,
  setEditItemModal
) => {
  setEditMode(false);
  setEditItemModal(false);
  await fetchData();
};

// Handle delete button
export const handleDelete = async (id, fetchData) => {
  try {
    await Database.deleteItem(id).then((message) => {
      console.log(message);
    });
    await fetchData();
  } catch (error) {
    console.error(error);
  }
};
