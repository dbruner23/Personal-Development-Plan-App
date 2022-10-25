import Tree from "react-d3-tree";
import myTreeData from "./myTreeData";


const OurTree = () => {
  return (
    <div id="treeWrapper" style={{ width: "80vw", height: "70vh" }}>
      <Tree data={myTreeData} orientation="horizontal"/>
    </div>
  );
}
export default OurTree