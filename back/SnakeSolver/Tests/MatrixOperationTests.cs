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
        [DataRow(new double[] { 180, 0, 0, 0 }, new double[] { 0.5, 3.5, 0 })]
        [DataRow(new double[] { 180, 180, 180, 0 }, new double[] { -0.5, -0.5, 0 })]
        [DataRow(new double[] { 90, 0, 0, 90, 0, 0, 0, 0, 90 }, new double[] { -1, 4, -5.66 })]
        public void GetPositionGivenAngleArrayReturnsValidPosition(double[] anglesArray, double[] expectedPosition)
        {
            // Arrange
            var angles = Vector<double>.Build.DenseOfArray(anglesArray);

            // Act
            var result = MatrixOperations.GetPosition(angles);

            // Assert
            var expected = Vector<double>.Build.DenseOfArray(expectedPosition);
            var subtract = expected.Subtract(result);
            Assert.IsTrue(subtract.L2Norm() < 0.01);
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
