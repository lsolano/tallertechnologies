using System.Collections;
using System.ComponentModel.DataAnnotations;

namespace TasksApi;

/// <summary>
/// Represents a task in the system
/// </summary>
public class TaskModel : IComparable<TaskModel>, IEquatable<TaskModel>
{
    /// <summary>
    /// Unique identifier for the task
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// Name of the task (required, 10-100 characters)
    /// </summary>
    [Required, StringLength(100, MinimumLength = 10)]
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Description of the task (optional, max 1000 characters)
    /// </summary>
    [StringLength(1000)]
    public string Description { get; set; } = string.Empty;

    public int CompareTo(TaskModel? other) => Id.CompareTo(other?.Id);

    public override bool Equals(object? obj) => Equals(obj as TaskModel);

    public bool Equals(TaskModel? other)
    {
        if (other is null) return false;
        if (ReferenceEquals(this, other)) return true;

        return Id == other.Id;
    }

    public override int GetHashCode() => Id.GetHashCode();
}
