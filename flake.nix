{
  description = "A Nix-flake-based Node.js development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";

  };

  outputs = { self, nixpkgs, ... }:
    let
      # system should match the system you are running on
      system = "x86_64-linux";
      # system = "x86_64-darwin";
    in
    {
      devShells."${system}".default =
        let
          pkgs = import nixpkgs {
            inherit system;
          };
        in
        pkgs.mkShell {
          # create an environment with nodejs, pnpm, and yarn
          packages = with pkgs; [
            nodejs_22
            nodePackages.pnpm
            (yarn.override { nodejs = nodejs_22; })
          ];

          shellHook = ''
            echo "node `${pkgs.nodejs}/bin/node --version`"
            # exec zsh
          '';
        };
    };
}
