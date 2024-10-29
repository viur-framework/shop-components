// import { ViURShopClient } from "@viur/viur-shop-client";

// const sc = new ViURShopClient({
//   host_url:
//     window.location.origin === "http://localhost:8081"
//       ? "http://localhost:8080"
//       : window.location.origin,
// });

// export class Node {
//   constructor(key, parententry) {
//       this.key = key;
//       this.parententry = parententry;
//       this.children = [];
//   }
// }

// function buildTree(data, parentId = null) {
//   const nodes = {};
//   // Create nodes for each item in the data
//   data.forEach(({ id, parentId, name }) => {
//       nodes[id] = new Node(id, parentId, name);
//   });
//   const tree = [];
//   Object.values(nodes).forEach(node => {
//       // Check if the node belongs to the current parent
//       if (node.parentId === parentId) {
//           // Recursively build the children of the current node
//           const children = buildTree(data, node.id);
//           // Set the children of the current node
//           node.children = children;
//           // Add the current node to the tree
//           tree.push(node);
//       }
//   });
//   return tree;
// }
