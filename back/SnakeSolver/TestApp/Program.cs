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
            var position = Vector<double>.Build.DenseOfArray(new double[] { 0.5, 3.5, 0 });
            double dist = 1;

            while(dist > 0.1)
            {
                var result = Solver.GetShift(angles, position);
                angles += result;
                var newpos = MatrixOperations.GetPosition(angles);
                dist = (newpos - position).L2Norm();
                Console.WriteLine(angles);
            }
        }
    }
}
