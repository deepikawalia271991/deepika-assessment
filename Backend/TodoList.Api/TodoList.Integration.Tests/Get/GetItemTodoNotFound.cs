using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using TodoList.Api;
using TodoList.Api.Models.Requests;
using TodoList.Api.Models.Responses;
using TodoList.Data;
using TodoList.Data.Models;
using Xunit;

namespace TodoList.Integration.Tests.Get;

public class GetItemTodoNotFound : IClassFixture<CustomWebApplicationFactory<Startup>>, IAsyncLifetime

{
    private readonly HttpClient _client;
    private readonly CustomWebApplicationFactory<Startup> _factory;
    private HttpResponseMessage _response;
    private readonly TodoContext _dbContext;
    private TodoItemResponse? result;

    public GetItemTodoNotFound(CustomWebApplicationFactory<Startup> factory)
    {
        _client = factory.CreateClient(new WebApplicationFactoryClientOptions
        {
            AllowAutoRedirect = false
        });
        _factory = factory;
        var scope = _factory.Services.CreateScope();
        _dbContext = scope.ServiceProvider.GetRequiredService<TodoContext>();
    }

    [Fact]
    public void Should_Be_Successful()
    {
        _response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    public async Task InitializeAsync()
    {
        _response = await _client.GetAsync($"api/todoitems/{Guid.NewGuid()}");
    }

    public async Task DisposeAsync()
    {
        await _dbContext.DisposeAsync();
        _client.Dispose();
        _factory.Dispose();
    }
}