-- CreateTable
CREATE TABLE "credential" (
    "username" VARCHAR(12) NOT NULL,
    "password" VARCHAR(25),
    "role" VARCHAR(255),

    CONSTRAINT "credential_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "product" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(50),
    "quantity" INTEGER,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_request_queue" (
    "product_id" INTEGER NOT NULL,
    "product_name" VARCHAR(50),
    "product_quantity" INTEGER,
    "username" VARCHAR(12) NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "status" VARCHAR(50) DEFAULT 'pending',

    CONSTRAINT "product_request_queue_pkey" PRIMARY KEY ("product_id","username","type")
);

-- CreateIndex
CREATE INDEX "username" ON "product_request_queue"("username");

-- AddForeignKey
ALTER TABLE "product_request_queue" ADD CONSTRAINT "product_request_queue_ibfk_1" FOREIGN KEY ("username") REFERENCES "credential"("username") ON DELETE RESTRICT ON UPDATE RESTRICT;
