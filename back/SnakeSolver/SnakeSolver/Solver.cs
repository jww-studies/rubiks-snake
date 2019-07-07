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

        public static double[] GetSolution(double[] startAnglesApproximation, double[] expectedPosition, double accuracy = 0.01, int iterationLimit = 1000000)
        {
            if(startAnglesApproximation.Length < 1)
            {
                throw new ArgumentException("Angles array must be at least 1 long");
            }

            if(expectedPosition.Length != 3)
            {
                throw new ArgumentException("Expeced position array must be 3 long");
            }

            var angles = Vector<double>.Build.DenseOfArray(startAnglesApproximation);
            var position = Vector<double>.Build.DenseOfArray(expectedPosition);
            double dist = 1;
            Vector<double> newPosition = null;

            for(int i = 0; i < iterationLimit && dist > accuracy; i++)
            {
                var result = GetShift(angles, position);
                angles += result;
                newPosition = MatrixOperations.GetPosition(angles);
                dist = (newPosition - position).L2Norm();
                //Console.WriteLine($"{newPosition[0]} {newPosition[1]} {newPosition[2]}");
            }
            int digits = Math.Max(-(int)Math.Log10(accuracy), 0);
            return dist > accuracy ? null : angles.ToArray().Select(el => Math.Round(mod(el, 360) - 180, digits)).ToArray();
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
