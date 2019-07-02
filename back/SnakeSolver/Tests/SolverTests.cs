using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MathNet.Numerics.LinearAlgebra;
using SnakeSolver;

namespace Tests
{
    [TestClass]
    public class SolverTests
    {
        [TestMethod]
        public void GetShiftGivenAngleArrayReturnsNonZeroShiftVector()
        {
            // Arrange
            var angles = Vector<double>.Build.DenseOfArray(new double[] { 180, 0, 0, 0 });
            var position = Vector<double>.Build.DenseOfArray(new double[] { 0.5, 3.5, 0 });

            // Act
            var result = Solver.GetShift(angles, position);

            // Assert
            Assert.IsTrue(result.L1Norm() > 0);
            Assert.AreEqual(result.Count, angles.Count);
        }
    }
}
