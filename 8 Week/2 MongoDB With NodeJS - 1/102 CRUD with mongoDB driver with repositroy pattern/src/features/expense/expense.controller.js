import ExpenseRepository from "./expense.repository.js";
import { ObjectId } from "mongodb";

export default class ExpenseController {
  constructor() {
    this.expenseRepository = new ExpenseRepository();
  }

  // Create new expense
  add = async (req, res) => {
    try {
      const expense = req.body;
      const result = await this.expenseRepository.addExpense(expense);
      if (result) {
        res.status(201).send(expense)
      } else {
        res.status(400).send("Failed to add expense");
      }
    } catch (error) {
      console.error("Error in add:", error);
      res.status(500).send("Internal server error");
    }
  };

  // Get a specific expense
  getOne = async (req, res) => {
    const { id } = req.params;
    const expense = await this.expenseRepository.getOne(id);
    if (expense) {
      res.status(200).send(expense);
    } else {
      res.status(404).send("Expense not found");
    }

  };

  // Get all expenses
  getAll = async (req, res) => {
    const expenses = await this.expenseRepository.getAllExpenses();
    res.status(200).json(expenses);

  };

  // Add a tag to an expense
  addTag = async (req, res) => {
    const { id } = req.params;
    const { tag } = req.body;

    const result = await this.expenseRepository.addTagToExpense(id, tag);
    if (result.modifiedCount > 0) {
      res.status(200).send("Tag added successfully");
    } else {
      res.status(200).send("Failed to add tag");
    }
  };

  // Filter expenses based on given criteria
  filter = async (req, res) => {
    try {
      const criteria = req.query;
      const expenses = await this.expenseRepository.filterExpenses(criteria);
      res.status(200).send(expenses);
    } catch (error) {
      console.error("Error in filter:", error);
      res.status(500).json("Internal server error");
    }
  };
}
