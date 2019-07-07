using System;
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
    }
}
