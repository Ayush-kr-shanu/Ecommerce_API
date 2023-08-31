const { Category } = require("../Models/Category.model")

async function createCategory(req, res) {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create category" });
  }
}

async function getCategories(req, res) {
  try {
    const categories = await Category.findAll();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve categories" });
  }
}

async function updateCategory(req, res) {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    category.name = name;
    await category.save();
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update category" });
  }
}

async function deleteCategory(req, res) {
  try {
    const { categoryId } = req.params;
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    await category.destroy();
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete category" });
  }
}

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
