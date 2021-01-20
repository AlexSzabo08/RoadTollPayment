import RoadToll from '../contracts/RoadToll.sol'

const RoadToll = artifacts.require("RoadToll");

module.exports = function(deployer) {
  deployer.deploy(RoadToll);
};
