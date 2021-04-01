## keyof用于获取某种类型的所有键

```
interface Person {
  name: string;
  age: number;
  location: string;
}

type K1 = keyof Person; // "name" | "age" | "location"
type K2 = keyof Person[];  // number | "length" | "push" | "concat" | ...
type K3 = keyof { [x: string]: Person };  // string | number
```

```
class Person {
  name: string = "Semlinker";
}

let sname: keyof Person;
sname = "name";
```