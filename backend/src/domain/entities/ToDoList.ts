/**
 * ToDoList Entity
 * Represents a collection of to-do items owned by a user
 * This is a core domain entity with no external dependencies
 */

export interface ToDoListProps {
  id: string;
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export class ToDoList {
  private static readonly MIN_TITLE_LENGTH = 1;
  private static readonly MAX_TITLE_LENGTH = 100;

  private constructor(private props: ToDoListProps) {}

  static create(props: Omit<ToDoListProps, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): ToDoList {
    ToDoList.validateTitle(props.title);

    const now = new Date();
    return new ToDoList({
      id: props.id || crypto.randomUUID(),
      userId: props.userId,
      title: props.title.trim(),
      createdAt: now,
      updatedAt: now,
    });
  }

  static reconstitute(props: ToDoListProps): ToDoList {
    return new ToDoList(props);
  }

  private static validateTitle(title: string): void {
    if (!title || title.trim().length < ToDoList.MIN_TITLE_LENGTH) {
      throw new Error('ToDoList title cannot be empty');
    }

    if (title.trim().length > ToDoList.MAX_TITLE_LENGTH) {
      throw new Error(`ToDoList title cannot exceed ${ToDoList.MAX_TITLE_LENGTH} characters`);
    }
  }

  // Getters
  get id(): string {
    return this.props.id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get title(): string {
    return this.props.title;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  // Business methods
  updateTitle(newTitle: string): void {
    ToDoList.validateTitle(newTitle);
    this.props.title = newTitle.trim();
    this.props.updatedAt = new Date();
  }

  belongsTo(userId: string): boolean {
    return this.props.userId === userId;
  }

  // Convert to plain object
  toObject(): ToDoListProps {
    return {
      id: this.props.id,
      userId: this.props.userId,
      title: this.props.title,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }
}

