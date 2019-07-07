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
            //angles[0] = 0;
            var position = Vector<double>.Build.DenseOfArray(new double[] { 0.5, 22.5, 0 });
            double dist = 1;

            while(dist > 0.01)
            {
                var result = Solver.GetShift(angles, position);
                angles += result;
                var newpos = MatrixOperations.GetPosition(angles);
                dist = (double)(newpos - position).L2Norm();
                Console.WriteLine($"{newpos[0]} {newpos[1]} {newpos[2]}");
            }
        }
    }
}
