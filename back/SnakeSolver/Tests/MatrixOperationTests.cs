using System;
using System.Text;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SnakeSolver;
using MathNet.Numerics.LinearAlgebra;

namespace Tests
{
    [TestClass]
    public class MatrixOperationTests
    {
        [TestMethod]
        public void GetPositionGivenAngleArrayReturnsValidPosition()
        {
            // Arrange
            var angles = Vector<double>.Build.DenseOfArray(new double[] { 180, 0, 0, 0 });

            // Act
            var result = MatrixOperations.GetPosition(angles);

            // Assert
            var expected = Vector<double>.Build.DenseOfArray(new double[] { 0.5, 3.5, 0 });
            var subtract = expected.Subtract(result);
            Assert.IsTrue(subtract.L2Norm() < 1e-15);
        }

        [TestMethod]
        public void GetDerrivativeApproximationGivenAngleArrayReturnsValidMatrix()
        {
            // Arrange
            var angles = Vector<double>.Build.DenseOfArray(new double[] { 180, 0, 0, 0 });

            // Act
            var result = MatrixOperations.GetDerrivativeApproximation(angles);

            // Assert
            var norm = result.L2Norm();
            Assert.IsTrue(norm > 0);
        }
    }
}
