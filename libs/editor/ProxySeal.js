class ProxySeal {
	constructor(object) {
		Object.seal(object); //Sellamos el objeto para que no se puedan añadir propiedades al vuelo
		return new Proxy(object, this.getHandler());
	}

	getHandler() {
		return {
			set: function(target, property, value) {
				if (!target.hasOwnProperty(property)) {
					throw new Error(`No se pueden añadir nuevas propiedades: ${property}`);
				}
				target[property] = value;
				return true;
			}
		};
	}
}