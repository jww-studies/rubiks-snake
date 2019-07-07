using System;
using MathNet.Numerics.LinearAlgebra;

namespace SnakeSolver
{
    public static class MatrixOperations
    {
        public static Matrix<double> GetOddRotationMatrix(double angle)
        {
            double alpha = angle * (double)(Math.PI / 180);
            double cos = (double)Math.Cos(alpha);
            double sinBySqrt2 = (double)Math.Sin(alpha) / (double)Math.Sqrt(2);
            return Matrix<double>.Build.DenseOfArray(new double[,]
            {
                { 0.5 * (1 + cos), -0.5 * (1 - cos), sinBySqrt2, 0 },
                { -0.5 * (1 - cos), 0.5 * (1 + cos), sinBySqrt2, 0 },
                { -sinBySqrt2, -sinBySqrt2, cos, 0 },
                { 0, 0, 0, 1 }
            });
        }

        public static Matrix<double> GetEvenRotationMatrix(double angle)
        {
            double alpha = angle * (double)Math.PI / 180;
            double cos = (double)Math.Cos(alpha);
            double sinBySqrt2 = (double)Math.Sin(alpha) / (double)Math.Sqrt(2);
            return Matrix<double>.Build.DenseOfArray(new double[,]
            {
                { 0.5 * (1 + cos), 0.5 * (1 - cos), sinBySqrt2, 0 },
                { 0.5 * (1 - cos), 0.5 * (1 + cos), -sinBySqrt2, 0 },
                { -sinBySqrt2, sinBySqrt2, cos, 0 },
                { 0, 0, 0, 1 }
            });
        }

        public static Vector<double> GetPosition(Vector<double> angles)
        {
            if(angles.Count < 2)
            {
                throw new ArgumentException("Angles vector length must be at least 2");
            }

            var result = Vector<double>.Build.DenseOfArray(new double[] { angles.Count, 0, 0, 1 });

            for(int i = angles.Count - 1; i >= 0; i--)
            {
                double distance = i + 0.5;
                var m1 = Matrix<double>.Build.DenseIdentity(4);
                m1[0, 3] = distance;
                var m2 = Matrix<double>.Build.DenseIdentity(4);
                m2[0, 3] = -distance;
                var rotationMatrix = i % 2 == 0 ? GetEvenRotationMatrix(angles[i]) : GetOddRotationMatrix(angles[i]);
                result = m1 * rotationMatrix * m2 * result;
            }

            return result.SubVector(0, 3);
        }

        public static Matrix<double> GetDerrivativeApproximation(Vector<double> angles)
        {
            if (angles.Count < 2)
            {
                throw new ArgumentException("Angles vector length must be at least 2");
            }

            const double h = 0.01;
            var result = Matrix<double>.Build.DenseOfArray(new double[3, angles.Count]);
            var pos = GetPosition(angles);
            for(int i = 0; i < angles.Count; i++)
            {
                var angles2 = angles.Clone();
                var angles3 = angles.Clone();
                angles2[i] += h;
                angles3[i] += 2 * h;
                var pos2 = GetPosition(angles2);
                var pos3 = GetPosition(angles3);
                var tmp = (-3 * pos + 4 * pos2 - pos3) / (h * 2);
                result.SetColumn(i, tmp.ToArray());
            }

            return result;
        }
    }
}
