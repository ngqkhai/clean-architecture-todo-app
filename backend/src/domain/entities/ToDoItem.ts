/**
 * ToDoItem Entity
 * Represents an individual task within a to-do list
 * This is a core domain entity with no external dependencies
 */

export interface ToDoItemProps {
  id: string;
  listId: string;
  title: string;
  description: string | null;
  isCompleted: boolean;
  startDate: Date | null;
  deadlineDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export class ToDoItem {
  private static readonly MIN_TITLE_LENGTH = 1;
  private static readonly MAX_TITLE_LENGTH = 200;
  private static readonly MAX_DESCRIPTION_LENGTH = 1000;

  private constructor(private props: ToDoItemProps) {}

  static create(
    props: Omit<ToDoItemProps, 'id' | 'isCompleted' | 'createdAt' | 'updatedAt'> & { 
      id?: string;
      isCompleted?: boolean;
    }
  ): ToDoItem {
    ToDoItem.validateTitle(props.title);
    
    if (props.description) {
      ToDoItem.validateDescription(props.description);
    }

    ToDoItem.validateDateRange(props.startDate, props.deadlineDate);

    const now = new Date();
    return new ToDoItem({
      id: props.id || crypto.randomUUID(),
      listId: props.listId,
      title: props.title.trim(),
      description: props.description ? props.description.trim() : null,
      isCompleted: props.isCompleted || false,
      startDate: props.startDate,
      deadlineDate: props.deadlineDate,
      createdAt: now,
      updatedAt: now,
    });
  }

  static reconstitute(props: ToDoItemProps): ToDoItem {
    return new ToDoItem(props);
  }

  private static validateTitle(title: string): void {
    if (!title || title.trim().length < ToDoItem.MIN_TITLE_LENGTH) {
      throw new Error('ToDoItem title cannot be empty');
    }

    if (title.trim().length > ToDoItem.MAX_TITLE_LENGTH) {
      throw new Error(`ToDoItem title cannot exceed ${ToDoItem.MAX_TITLE_LENGTH} characters`);
    }
  }

  private static validateDescription(description: string): void {
    if (description.length > ToDoItem.MAX_DESCRIPTION_LENGTH) {
      throw new Error(`Description cannot exceed ${ToDoItem.MAX_DESCRIPTION_LENGTH} characters`);
    }
  }

  private static validateDateRange(startDate: Date | null, deadlineDate: Date | null): void {
    if (startDate && deadlineDate && deadlineDate < startDate) {
      throw new Error('Deadline date cannot be before start date');
    }
  }

  // Getters
  get id(): string {
    return this.props.id;
  }

  get listId(): string {
    return this.props.listId;
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string | null {
    return this.props.description;
  }

  get isCompleted(): boolean {
    return this.props.isCompleted;
  }

  get startDate(): Date | null {
    return this.props.startDate;
  }

  get deadlineDate(): Date | null {
    return this.props.deadlineDate;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  // Business methods
  updateTitle(newTitle: string): void {
    ToDoItem.validateTitle(newTitle);
    this.props.title = newTitle.trim();
    this.props.updatedAt = new Date();
  }

  updateDescription(newDescription: string | null): void {
    if (newDescription) {
      ToDoItem.validateDescription(newDescription);
      this.props.description = newDescription.trim();
    } else {
      this.props.description = null;
    }
    this.props.updatedAt = new Date();
  }

  updateDates(startDate: Date | null, deadlineDate: Date | null): void {
    ToDoItem.validateDateRange(startDate, deadlineDate);
    this.props.startDate = startDate;
    this.props.deadlineDate = deadlineDate;
    this.props.updatedAt = new Date();
  }

  markAsCompleted(): void {
    this.props.isCompleted = true;
    this.props.updatedAt = new Date();
  }

  markAsIncomplete(): void {
    this.props.isCompleted = false;
    this.props.updatedAt = new Date();
  }

  toggleCompletion(): void {
    this.props.isCompleted = !this.props.isCompleted;
    this.props.updatedAt = new Date();
  }

  isOverdue(): boolean {
    if (!this.props.deadlineDate || this.props.isCompleted) {
      return false;
    }
    return this.props.deadlineDate < new Date();
  }

  isDueSoon(hoursThreshold: number = 48): boolean {
    if (!this.props.deadlineDate || this.props.isCompleted) {
      return false;
    }
    const now = new Date();
    const threshold = new Date(now.getTime() + hoursThreshold * 60 * 60 * 1000);
    return this.props.deadlineDate <= threshold && this.props.deadlineDate > now;
  }

  belongsToList(listId: string): boolean {
    return this.props.listId === listId;
  }

  // Convert to plain object
  toObject(): ToDoItemProps {
    return {
      id: this.props.id,
      listId: this.props.listId,
      title: this.props.title,
      description: this.props.description,
      isCompleted: this.props.isCompleted,
      startDate: this.props.startDate,
      deadlineDate: this.props.deadlineDate,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }
}

