import Tree from "react-d3-tree";
import myTreeData from "./myTreeData";


const OurTree = () => {
  return (
    <div id="treeWrapper" style={{ width: "80vw", height: "70vh" }}>
      <Tree 
      data={myTreeData}
      translate={{ x: 450, y: 90 }} 
      initialDepth={0}
      orientation="vertical"
      separation={{ siblings: 2.5, nonSiblings: 3.5 }}
      pathFunc="step"
      
     />
    </div>
  );
}
export default OurTree