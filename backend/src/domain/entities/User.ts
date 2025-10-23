/**
 * User Entity
 * Represents a user in the system
 * This is a core domain entity with no external dependencies
 */

export interface UserProps {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private constructor(private props: UserProps) {}

  static create(props: Omit<UserProps, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): User {
    const now = new Date();
    return new User({
      id: props.id || crypto.randomUUID(),
      email: props.email,
      name: props.name,
      passwordHash: props.passwordHash,
      createdAt: now,
      updatedAt: now,
    });
  }

  static reconstitute(props: UserProps): User {
    return new User(props);
  }

  // Getters
  get id(): string {
    return this.props.id;
  }

  get email(): string {
    return this.props.email;
  }

  get name(): string {
    return this.props.name;
  }

  get passwordHash(): string {
    return this.props.passwordHash;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  // Business methods
  updateName(newName: string): void {
    if (!newName || newName.trim().length === 0) {
      throw new Error('Name cannot be empty');
    }
    if (newName.length > 100) {
      throw new Error('Name cannot exceed 100 characters');
    }
    this.props.name = newName.trim();
    this.props.updatedAt = new Date();
  }

  // Convert to plain object
  toObject(): UserProps {
    return {
      id: this.props.id,
      email: this.props.email,
      name: this.props.name,
      passwordHash: this.props.passwordHash,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }
}

