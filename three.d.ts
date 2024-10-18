declare module 'three' {
  export class Mesh extends Object3D {
    constructor(geometry?: BufferGeometry, material?: Material | Material[]);
    geometry: BufferGeometry;
    material: Material | Material[];
    // Add other properties and methods as needed
  }

  export class Object3D {
    position: Vector3;
    rotation: Euler;
    scale: Vector3;
    add(object: Object3D): this;
    // Add properties and methods of Object3D
  }

  export class BufferGeometry {
    attributes: {
      [name: string]: BufferAttribute;
    };
    index: BufferAttribute | null;
    // Add other properties as needed
  }

  export class Material {
    // Add properties and methods of Material
  }

  export class IcosahedronGeometry extends BufferGeometry {
    constructor(radius?: number, detail?: number);
    parameters: {
      radius: number;
      detail: number;
    };
  }

  export class BufferAttribute {
    array: ArrayLike<number>;
    itemSize: number;
    count: number;
    // Add other properties as needed
  }

  // Add other classes, interfaces, and types as needed

  // Example: If you're using PerspectiveCamera, Scene, WebGLRenderer, etc.
  export class PerspectiveCamera extends Camera {
    constructor(fov?: number, aspect?: number, near?: number, far?: number);
  }

  export class Camera extends Object3D {
    // Camera properties and methods
  }

  export class Scene extends Object3D {
    // Scene properties and methods
  }

  export class WebGLRenderer {
    constructor(parameters?: WebGLRendererParameters);
    render(scene: Scene, camera: Camera): void;
    setSize(width: number, height: number, updateStyle?: boolean): void;
    domElement: HTMLCanvasElement;
    // Add other methods as needed
  }

  export class Vector3 {
    constructor(x?: number, y?: number, z?: number);
    x: number;
    y: number;
    z: number;
    fromBufferAttribute(attribute: BufferAttribute, index: number, offset?: number): this;
    // Add other methods as needed
  }

  export class Euler {
    constructor(x?: number, y?: number, z?: number, order?: string);
    x: number;
    y: number;
    z: number;
    order: string;
  }

  export class MeshBasicMaterial extends Material {
    constructor(parameters?: MeshBasicMaterialParameters);
  }

  interface WebGLRendererParameters {
    canvas?: HTMLCanvasElement;
    antialias?: boolean;
    alpha?: boolean;
  }

  interface MeshBasicMaterialParameters {
    color?: ColorRepresentation;
    wireframe?: boolean;
  }

  type ColorRepresentation = number | string;
}
