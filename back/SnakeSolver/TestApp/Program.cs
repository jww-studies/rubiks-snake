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
            var angles = Vector<double>.Build.DenseOfArray(new double[23]);
            var position = Vector<double>.Build.DenseOfArray(new double[] { 0.5, 22.5, 0 });

            var res = Solver.GetSolution(angles, position, 0.001, 100000);
            Console.WriteLine(res);
        }
    }
}
