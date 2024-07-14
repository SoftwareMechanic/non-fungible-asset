"use client"
import { useEffect, useRef } from "react";
//import { useSelector} from "react-redux";
import * as OBC from "openbim-components";
//import styles from "../page.module.css";


export default function IfcModelViewer(props) {

    const containerRef = useRef();

    const setupScene = async () => {
        const components = new OBC.Components()
        components.scene = new OBC.SimpleScene(components);
        components._renderer = new OBC.SimpleRenderer(components, containerRef.current);
        components.camera = new OBC.SimpleCamera(components);
        components.raycaster = new OBC.SimpleRaycaster(components);

        components.init();

        // Add some elements to the scene

        components.scene.setup();

        let fragments = new OBC.FragmentManager(components);
        let fragmentIfcLoader = new OBC.FragmentIfcLoader(components);

        await fragmentIfcLoader.setup()

        fragmentIfcLoader.settings.webIfc.COORDINATE_TO_ORIGIN = true;
        fragmentIfcLoader.settings.webIfc.OPTIMIZE_PROFILES = true;

        const scene = components.scene.get();
        
        window.scene = scene;
        window.fragmentIfcLoader = fragmentIfcLoader

        console.log("Scene loaded")
    }

    const renderIfcFile = async () => {
      
        try{
            
            console.log(props)
            console.log("fetch " + props.fileURL)
          const ifcData = await fetch(props.fileURL);//await fetch('models/modelname.ifc');
          console.log("ifc data ok")
          console.log(ifcData)
          const ifcBuffer = await ifcData.arrayBuffer();
      
          console.log("ifc buffer ok")
          console.log(ifcBuffer)
          const model = await fragmentIfcLoader.load(new Uint8Array(ifcBuffer), "example");
          console.log("model ok")
          scene.remove(window.model);
          scene.add(model);
    
          window.model = model
          //scene.remove(model)
        }
        catch(err){
          console.log("Error loading ifc file")
          console.log(err)
        }
    }

    useEffect(() => {
        setupScene()
        //createIfcFileFrontEnd()
    },[])
    
    useEffect(() => {
      renderIfcFile()
    }, []);


    return (
        <div style={{minWidth: "100%", minHeight: "100vh"}}>
            <div style={{minWidth: "100%", minHeight: "100vh"}} ref={containerRef} ></div>
        </div>
    )

}