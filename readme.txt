Install Sdk 3.1.410
https://dotnet.microsoft.com/download/dotnet/thank-you/sdk-3.1.410-windows-x64-installer

cd .\TruckManager.Domain\
> dotnet tool install dotnet-ef --global
> dotnet ef migrations add Initial
> dotnet ef database update

cd ..
dotnet run --project .\TruckManager.Web\TruckManager.Web.csproj


##
dotnet add package Microsoft.EntityFrameworkCore

dotnet new classlib -f netcoreapp3.1
dotnet new mstest -f netcoreapp3.1
dotnet new web -f netcoreapp3.1
dotnet new mstest -f netcoreapp3.1

dotnet add .\TruckManager.Web.csproj reference ..\TruckManager.InfraStructure\TruckManager.InfraStructure.csproj

dotnet sln .\TruckManager.sln add .\TruckManager.Api\TruckManager.Api.csproj
dotnet sln .\TruckManager.sln add .\TruckManager.Application\TruckManager.Application.csproj
dotnet sln .\TruckManager.sln add .\TruckManager.Domain\TruckManager.Domain.csproj
dotnet sln .\TruckManager.sln add .\TruckManager.InfraStructure\TruckManager.InfraStructure.csproj
dotnet sln .\TruckManager.sln add .\TruckManager.Test\TruckManager.Test.csproj
dotnet sln .\TruckManager.sln add .\TruckManager.Web\TruckManager.Web.csproj



### Rodar com VueJs
Iniciar o Projeto da API netcoreapp (visual studio debug/f5)
https://localhost:44368

No VsCode abra o projeto VueJs na pasta raiz /TruckManager.FrontVueJs
instale os pacotes: npm install
para rodar local use: npm run dev
https://localhost:3000

*O project VueJs esta apontando para a porta da api (https://localhost:44368)