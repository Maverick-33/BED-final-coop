class BadRequest extends Error { 
    constructor(resourceType, id) { 
        super(`Request body is invalid`);
        this.name = 'BadRequest';
    } 
} 

export default BadRequest;