using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using SnakeSolver;

namespace FunctionSolver
{
    public static class Solve
    {
        [FunctionName("Solve")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger Solver  function processed a request.");

            try
            {
                double X = double.Parse(req.Query["x"]);
                double Y = double.Parse(req.Query["y"]);
                double Z = double.Parse(req.Query["z"]);
                int length = int.Parse(req.Query["len"]);
                var res = Solver.GetSolution(new double[length], new double[] { X, Y, Z });
                return (ActionResult)new OkObjectResult(res);
            }
            catch (Exception e)
            {
                return new BadRequestResult();
            }
        }
    }
}
