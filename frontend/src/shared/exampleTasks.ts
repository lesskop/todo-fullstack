const exampleTasks: Array<string> = [
  "Buy groceries",
  "Walk the dog",
  "Write a blog post",
  "Go to the gym",
  "Run 2 kilometers",
  "Learn React",
  "Cook dinner",
  "Read a chapter from a book",
  "Call a friend",
  "Organize workspace",
  "Try a new recipe",
  "Stretch for 10 minutes",
  "Clean closet",
  "Water the plants",
  "Visit a museum",
  "Write a thank-you note",
  "Plan a vacation",
  "Practice instrument",
  "Take a walk",
  "Sort emails",
];

const randomIndex: number = Math.floor(Math.random() * exampleTasks.length);

export const randomPlaceholderTask: string = exampleTasks[randomIndex];
