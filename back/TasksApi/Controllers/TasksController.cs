using Microsoft.AspNetCore.Mvc;
using System.Collections.Concurrent;

namespace TasksApi.Controllers;

[ApiController]
[Route("[controller]")]
public class TasksController(ILogger<TasksController> logger) : ControllerBase
{
    private readonly ILogger<TasksController> _logger = logger;
    private static readonly ConcurrentDictionary<Guid, TaskModel> _tasks = new();

    [HttpGet]
    public IEnumerable<TaskModel> Get() => _tasks.Values;

    [HttpGet("{id}")]
    public ActionResult<TaskModel> GetById(Guid id)
    {
        return _tasks.TryGetValue(id, out var task) 
            ? Ok(task) 
            : NotFound();
    }

    [HttpPost]
    public ActionResult<TaskModel> Post(TaskModel task)
    {
        if (task.Id == Guid.Empty)
        {
            task.Id = Guid.NewGuid();
        }

        if (_tasks.TryAdd(task.Id, task))
        {
            _logger.LogInformation("Task created with ID: {TaskId}", task.Id);
            return CreatedAtAction(nameof(GetById), new { id = task.Id }, task);
        }

        return Conflict("Task with this ID already exists");
    }
}
