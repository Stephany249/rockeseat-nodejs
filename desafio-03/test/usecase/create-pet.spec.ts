import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetsAdoptionRequirementRepository } from "@/repositories/in-memory/in-memory-pets-adoption-requirements-repository";
import { InMemoryPetsGalleryRepository } from "@/repositories/in-memory/in-memory-pets-gallery-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { CreatePetUseCase } from "@/usecase/create-pet";
import { MinimumOneAdoptionRequirementError } from "@/usecase/errors/minimum-one-adoption-requirement-error";
import { MinimumOneImageOfPetError } from "@/usecase/errors/minimum-one-image-of-pet-error";
import { ResourceNotFoundError } from "@/usecase/errors/resource-not-found-error";
import { hash } from "bcryptjs";
import { randomUUID } from "crypto";
import { beforeEach, describe, it, expect } from "vitest";

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let petsGalleryRepository: InMemoryPetsGalleryRepository
let petAdoptionsRequirementRepository: InMemoryPetsAdoptionRequirementRepository
let createPetUseCase: CreatePetUseCase

describe('Create Pet Use Case', () => {

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    petsGalleryRepository = new InMemoryPetsGalleryRepository()
    petAdoptionsRequirementRepository = new InMemoryPetsAdoptionRequirementRepository()
    createPetUseCase = new CreatePetUseCase(orgsRepository, petsRepository, petsGalleryRepository, petAdoptionsRequirementRepository)
  })

  it('should be able to create pet', async () => {
    const org = await orgsRepository.create({
      name: 'Teste 1',
      email: 'teste1@gmail.com',
      cep: '91215095',
      address: 'R. Luiz Fontoura Junior',
      whatsapp: '11999999999',
      password: await hash('123456', 6),
    })

    const { pet, petGallery, adoptionRequirements } = await createPetUseCase.execute({
      name: 'Buddy',
      description:
        'Buddy is a friendly and playful pet looking for a loving home. He loves to go on long walks and play fetch in the park.',
      age: 'ADULT',
      size: 'BIG',
      energy: 'HIGH',
      independence: 'HIGH',
      space: 'BIG',
      adoptionRequirements: `[{ "title": "Regular exercise" }, { "title": "Grooming" }, { "title": "Obedience training" }]`,
      images: [
        {
          fieldname: 'images',
          originalname: 'buddy_image1.jpg',
          encoding: '7bit',
          mimetype: 'image/jpeg',
          destination: '\\tmp\\images',
          filename: 'e1876d7348bb4d18debc-buddy_image1.jpg',
          path: 'tmp\\images\\e1876d7348bb4d18debc-caramelinho-1.jpeg',
          size: 137119
        },
        {
          fieldname: 'images',
          originalname: 'buddy_image2.jpg',
          encoding: '7bit',
          mimetype: 'image/jpeg',
          destination: 'tmp\\images',
          filename: '61efa15ca58ef8bf2161-buddy_image2.jpg',
          path: 'tmp\\images\\61efa15ca58ef8bf2161-buddy_image2.jpg',
          size: 76741
        },
        {
          fieldname: 'images',
          originalname: 'buddy_image3.jpg',
          encoding: '7bit',
          mimetype: 'image/jpeg',
          destination: 'tmp\\images',
          filename: '483770e3aacbe222e6c8-buddy_image3.jpg',
          path: 'tmp\\images\\483770e3aacbe222e6c8-buddy_image3.jpg',
          size: 44199
        }
      ],
      orgId: org.id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.photo).toContain('buddy_image1.jpg')
    expect(petGallery).toHaveLength(3)
    expect(petGallery).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        image: expect.stringContaining('buddy_image1.jpg')
      }),
      expect.objectContaining({
        id: expect.any(String),
        image: expect.stringContaining('buddy_image2.jpg')
      }),
      expect.objectContaining({
        id: expect.any(String),
        image: expect.stringContaining('buddy_image3.jpg')
      })
    ])
    expect(adoptionRequirements).toHaveLength(3)
    expect(adoptionRequirements).toEqual([
      expect.objectContaining({
        title: 'Regular exercise'
      }),
      expect.objectContaining({
        title: 'Grooming'
      }),
      expect.objectContaining({
        title: 'Obedience training'
      })
    ])
  })

  it(`should not be able to create pet if you can't find org`, async () => {
    await expect(createPetUseCase.execute({
      name: 'Buddy',
      description:
        'Buddy is a friendly and playful pet looking for a loving home. He loves to go on long walks and play fetch in the park.',
      age: 'ADULT',
      size: 'BIG',
      energy: 'HIGH',
      independence: 'HIGH',
      space: 'BIG',
      adoptionRequirements: `[{ "title": "Regular exercise" }, { "title": "Grooming" }, { "title": "Obedience training" }]`,
      images: [
        {
          fieldname: 'images',
          originalname: 'buddy_image1.jpg',
          encoding: '7bit',
          mimetype: 'image/jpeg',
          destination: '\\tmp\\images',
          filename: 'e1876d7348bb4d18debc-buddy_image1.jpg',
          path: 'tmp\\images\\e1876d7348bb4d18debc-caramelinho-1.jpeg',
          size: 137119
        },
        {
          fieldname: 'images',
          originalname: 'buddy_image2.jpg',
          encoding: '7bit',
          mimetype: 'image/jpeg',
          destination: 'tmp\\images',
          filename: '61efa15ca58ef8bf2161-buddy_image2.jpg',
          path: 'tmp\\images\\61efa15ca58ef8bf2161-buddy_image2.jpg',
          size: 76741
        },
        {
          fieldname: 'images',
          originalname: 'buddy_image3.jpg',
          encoding: '7bit',
          mimetype: 'image/jpeg',
          destination: 'tmp\\images',
          filename: '483770e3aacbe222e6c8-buddy_image3.jpg',
          path: 'tmp\\images\\483770e3aacbe222e6c8-buddy_image3.jpg',
          size: 44199
        }
      ],
      orgId: randomUUID()
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it(`should not be able to create pet if you don't send photos`, async () => {
    const org = await orgsRepository.create({
      name: 'Teste 1',
      email: 'teste1@gmail.com',
      cep: '91215095',
      address: 'R. Luiz Fontoura Junior',
      whatsapp: '11999999999',
      password: await hash('123456', 6),
    })

    await expect(createPetUseCase.execute({
      name: 'Buddy',
      description:
        'Buddy is a friendly and playful pet looking for a loving home. He loves to go on long walks and play fetch in the park.',
      age: 'ADULT',
      size: 'BIG',
      energy: 'HIGH',
      independence: 'HIGH',
      space: 'BIG',
      adoptionRequirements: `[{ "title": "Regular exercise" }, { "title": "Grooming" }, { "title": "Obedience training" }]`,
      images: [],
      orgId: org.id
    })).rejects.toBeInstanceOf(MinimumOneImageOfPetError)
  })

  it(`should not be able to create pet if you don't submit the requirements for adoption`, async () => {
    const org = await orgsRepository.create({
      name: 'Teste 1',
      email: 'teste1@gmail.com',
      cep: '91215095',
      address: 'R. Luiz Fontoura Junior',
      whatsapp: '11999999999',
      password: await hash('123456', 6),
    })

    await expect(createPetUseCase.execute({
      name: 'Buddy',
      description:
        'Buddy is a friendly and playful pet looking for a loving home. He loves to go on long walks and play fetch in the park.',
      age: 'ADULT',
      size: 'BIG',
      energy: 'HIGH',
      independence: 'HIGH',
      space: 'BIG',
      adoptionRequirements: `[]`,
      images: [
        {
          fieldname: 'images',
          originalname: 'buddy_image1.jpg',
          encoding: '7bit',
          mimetype: 'image/jpeg',
          destination: '\\tmp\\images',
          filename: 'e1876d7348bb4d18debc-buddy_image1.jpg',
          path: 'tmp\\images\\e1876d7348bb4d18debc-caramelinho-1.jpeg',
          size: 137119
        },
        {
          fieldname: 'images',
          originalname: 'buddy_image2.jpg',
          encoding: '7bit',
          mimetype: 'image/jpeg',
          destination: 'tmp\\images',
          filename: '61efa15ca58ef8bf2161-buddy_image2.jpg',
          path: 'tmp\\images\\61efa15ca58ef8bf2161-buddy_image2.jpg',
          size: 76741
        },
        {
          fieldname: 'images',
          originalname: 'buddy_image3.jpg',
          encoding: '7bit',
          mimetype: 'image/jpeg',
          destination: 'tmp\\images',
          filename: '483770e3aacbe222e6c8-buddy_image3.jpg',
          path: 'tmp\\images\\483770e3aacbe222e6c8-buddy_image3.jpg',
          size: 44199
        }
      ],
      orgId: org.id,
    })).rejects.toBeInstanceOf(MinimumOneAdoptionRequirementError)
  })
})