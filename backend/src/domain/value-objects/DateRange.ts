/**
 * DateRange Value Object
 * Encapsulates start and deadline date validation
 * Ensures deadline is always after or equal to start date
 */

export class DateRange {
  private constructor(
    private readonly startDate: Date | null,
    private readonly deadlineDate: Date | null
  ) {}

  static create(startDate: Date | null, deadlineDate: Date | null): DateRange {
    if (startDate && deadlineDate && deadlineDate < startDate) {
      throw new Error('Deadline date must be after or equal to start date');
    }

    return new DateRange(startDate, deadlineDate);
  }

  getStartDate(): Date | null {
    return this.startDate;
  }

  getDeadlineDate(): Date | null {
    return this.deadlineDate;
  }

  hasStartDate(): boolean {
    return this.startDate !== null;
  }

  hasDeadlineDate(): boolean {
    return this.deadlineDate !== null;
  }

  getDurationInDays(): number | null {
    if (!this.startDate || !this.deadlineDate) {
      return null;
    }

    const diffInMs = this.deadlineDate.getTime() - this.startDate.getTime();
    return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  }

  isInRange(date: Date): boolean {
    if (!this.startDate && !this.deadlineDate) {
      return true;
    }

    if (this.startDate && date < this.startDate) {
      return false;
    }

    if (this.deadlineDate && date > this.deadlineDate) {
      return false;
    }

    return true;
  }

  equals(other: DateRange): boolean {
    const sameStart =
      (this.startDate === null && other.startDate === null) ||
      (this.startDate !== null &&
        other.startDate !== null &&
        this.startDate.getTime() === other.startDate.getTime());

    const sameDeadline =
      (this.deadlineDate === null && other.deadlineDate === null) ||
      (this.deadlineDate !== null &&
        other.deadlineDate !== null &&
        this.deadlineDate.getTime() === other.deadlineDate.getTime());

    return sameStart && sameDeadline;
  }

  toString(): string {
    if (!this.startDate && !this.deadlineDate) {
      return 'No date range';
    }

    const start = this.startDate ? this.startDate.toISOString() : 'No start';
    const deadline = this.deadlineDate ? this.deadlineDate.toISOString() : 'No deadline';

    return `${start} - ${deadline}`;
  }
}

