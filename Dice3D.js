import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

function DiceModel({ rolling, setRolling }) {
  const diceRef = useRef();
  const { scene } = useGLTF(require("./assets/dice.glb"));
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useFrame(() => {
    if (rolling) {
      diceRef.current.rotation.x += 0.2;
      diceRef.current.rotation.y += 0.2;
    }
  });

  const stopRoll = () => {
    setRolling(false);
    diceRef.current.rotation.x = Math.PI * Math.floor(Math.random() * 4);
    diceRef.current.rotation.y = Math.PI * Math.floor(Math.random() * 4);
  };

  return <primitive ref={diceRef} object={scene} scale={2} onPointerUp={stopRoll} />;
}

export default function Dice3D() {
  const [rolling, setRolling] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <DiceModel rolling={rolling} setRolling={setRolling} />
      </Canvas>
      <TouchableOpacity style={styles.button} onPress={() => setRolling(true)}>
        <Text style={styles.buttonText}>Roll Dice</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ff9800",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});