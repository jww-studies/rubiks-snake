using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SnakeSolver;
using MathNet.Numerics.LinearAlgebra;

namespace TestApp
{
    class Program
    {
        static void Main(string[] args)
        {
            var res = Solver.GetSolution(new double[23], new double[] { 0.5, 22.5, 0 });
            foreach(var el in res)
            {
                Console.WriteLine(el);
            }
        }
    }
}
