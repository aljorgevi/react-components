import { formatCustomDate } from '../src/utils/helpers'

/**
 * Composes a detailed label using provided tag information.
 * @param {Object} params The parameters containing tag details.
 * @param {string} params.name The name of the tag.
 * @param {string} params.objectId The object ID of the tag.
 * @param {Date|string} params.asOfTime The creation time of the tag.
 * @returns {string} The composed detailed label.
 */
export function composeDetailedLabel({ name = 'Undefined Name', objectId, asOfTime }) {
	return `${name} (ID: ${objectId}) (CREATED: ${formatCustomDate(asOfTime)})`
}

/**
 * Destructures values from a tag object.
 * @param {Object} tag - The tag object containing attrs and definition.
 * @returns {Object} The destructured values.
 */
export function extractTagDetails(tag) {
	// const unknownValue = 'Unknown'
	const { definition, attrs } = tag
	const { asOfTime, objectId } = definition
	// add more trac_values...

	return {
		definition,
		attrs,
		asOfTime,
		objectId
	}
}

class TagManager {
	/**
	 * Creates a TagManager instance with initial definitions and attributes.
	 * @param {Object} initialDefinitions - Initial definitions for the tag manager.
	 * @param {Object} initialAttributes - Initial set of attributes.
	 */
	constructor(initialDefinitions = {}, initialAttributes = {}) {
		this.definitions = {
			type: 'job',
			...initialDefinitions
		}
		this.attributes = initialAttributes
	}

	/**
	 * Returns the TagManager instance.
	 * @return {TagManager} The current instance of TagManager.
	 */
	getTag() {
		return this
	}

	/**
	 * Adds or updates a definition by key.
	 * @param {string} key - The key for the definition to add or update.
	 * @param {Object} detail - The detail of the definition to add or update.
	 */
	setDefinition(key, detail) {
		this.definitions[key] = detail
	}

	/**
	 * Returns the definitions object.
	 * @return {Object} The current definitions object.
	 */
	getDefinitions() {
		return this.definitions
	}

	/**
	 * Returns the attributes object.
	 * @return {Object} The current attributes object.
	 */
	getAttributes() {
		return this.attributes
	}

	/**
	 * Adds or updates an attribute by name.
	 * @param {string} name - The name of the attribute.
	 * @param {Object} detail - The details of the attribute.
	 */
	setAttribute(name, detail) {
		this.attributes[name] = detail
	}

	/**
	 * Adds or updates multiple attributes at once.
	 * @param {Object} attributes - An object containing multiple attributes to be added or updated.
	 */
	setAttributes(attributes) {
		for (const [key, value] of Object.entries(attributes)) {
			this.attributes[key] = value
		}
	}
}

const initialAttributes = {
	flowName: { type: 'STRING', value: 'Initial Flow Name' }
}

const jobToRun = new TagManager({}, initialAttributes)

// Adding a new attribute
jobToRun.setAttribute('description', {
	type: 'STRING',
	id: 'description'
})

// Adding multiple attributes at once
jobToRun.setAttributes({
	priority: { type: 'INTEGER', value: 1 },
	status: { type: 'STRING', value: 'Active' }
})

console.log(jobToRun.getTag())
