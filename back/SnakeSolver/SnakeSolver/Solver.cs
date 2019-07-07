using System;
using System.Linq;
using MathNet.Numerics.LinearAlgebra;
using MathNet.Numerics.LinearAlgebra.Factorization;

namespace SnakeSolver
{
    public static class Solver
    {
        public static Vector<double> GetShift(Vector<double> angles, Vector<double> expectedPosition)
        {
            if (angles.Count < 2)
            {
                throw new ArgumentException("Angles vector length must be at least 2");
            }
            if(expectedPosition.Count != 3)
            {
                throw new ArgumentException("Expected position must be 3 dimensional");
            }

            var derr = MatrixOperations.GetDerrivativeApproximation(angles);
            var res = (MatrixOperations.GetPosition(angles) - expectedPosition) * -1;

            var qr = derr.Transpose().QR(QRMethod.Full);
            var R1 = qr.R.SubMatrix(0, 3, 0, 3);
            var tmp = Vector<double>.Build.DenseOfArray(new double[angles.Count]);
            tmp.SetSubVector(0, 3, R1.Transpose().Inverse() * res);
            return qr.Q * tmp;
        }

        public static Vector<double> GetSolution(Vector<double> startAnglesApproximation, Vector<double> expectedPosition, double accuracy, int iterationLimit)
        {
            var angles = startAnglesApproximation.Clone();
            double dist = 1;
            Vector<double> newPosition = null;

            for(int i = 0; i < iterationLimit && dist > accuracy; i++)
            {
                var result = GetShift(angles, expectedPosition);
                angles += result;
                newPosition = MatrixOperations.GetPosition(angles);
                dist = (newPosition - expectedPosition).L2Norm();
                Console.WriteLine($"{newPosition[0]} {newPosition[1]} {newPosition[2]}");
            }

            return dist > accuracy ? null : Vector<double>.Build.DenseOfArray(angles.ToArray().Select(el => mod(el, 360)).ToArray());
        }

        private static double mod(double a, double n)
        {
            var result = a % n;
            if ((result < 0 && n > 0) || (result > 0 && n < 0))
            {
                result += n;
            }
            return result;
        }
    }
}
