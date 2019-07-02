using System;
using System.Collections.Generic;
using MathNet.Numerics.LinearAlgebra;
using MathNet.Numerics.LinearAlgebra.Double;
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
            var res = -MatrixOperations.GetPosition(angles) + expectedPosition;
            var derr1 = DenseMatrix.OfArray(new double[angles.Count, angles.Count]);
            var res1 = Vector<double>.Build.DenseOfArray(new double[angles.Count]);
            derr1.SetSubMatrix(0, 0, derr);
            res1.SetSubVector(0, 3, res);

            var qr = derr1.QR(QRMethod.Full);
            return qr.Solve(res1);
        }
    }
}
