import 'reflect-metadata';
import { deserialize, deserializeArray, plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';

export default class ResponseMapper {

    public static mapJson(json?: any): ResponseMapper {
        return new ResponseMapper(json);
    }

    private json?: any;

    private constructor(json: any) {
        this.json = json;
    }

    public toClass<T>(clazz: ClassType<T>): T {
        return deserialize(clazz, this.json);
        // return plainToClass<T, T>(clazz, this.json);
    }

}
